const { set } = require("mongoose");
const Category = require("../models/category.model");
const Product = require("../models/product.model");


async function createProduct(reqData){
    let topLavel = await Category.findOne({name:reqData.topLavelCategory});

    if(!topLavel){
        topLavel = new Category({
            name:reqData.topLavelCategory,
            level:1
        })
        await  topLavel.save();
    }

    let secondLavel = await Category.findOne({
        name:reqData.secondLavelCategory,
        parentCategory:topLavel._id,
    })

    if(!secondLavel){
        secondLavel = new Category({
            name:reqData.secondLavelCategory,
             parentCategory:topLavel._id,
             level:2
        })
        await secondLavel.save();
    }

    let thirdlavel = await Category.findOne({
        name:reqData.thirdLavelCategory,
        parentCategory:secondLavel._id,
    })
    if(!thirdlavel){
        thirdlavel = new Category({
            name:reqData.thirdLavelCategory,
            parentCategory:secondLavel._id,
            level:3
        })
        await thirdlavel.save()
    }

    const product = new Product({
        title:reqData.title,
        color:reqData.color,
        description:reqData.description,
        discountedPrice:reqData.discountedPrice,
        discountPercent:reqData.discountPersent,
        imageUrl:reqData.imageUrl,
        brand:reqData.brand,
        price:reqData.price,
        sizes:reqData.size,
        quantity:reqData.quantity,
        category:thirdlavel
    })

    return await product.save();
}

async function deleteproduct(productId){
    // const product = await findProductById(productId)
    
    await Product.findByIdAndDelete(productId);
  return "product deleted Successfully"
}

async function updateproduct(productId,reqData){
    return await Product.findByIdAndUpdate(productId,reqData);

}
async function findProductById(id){
    const product = await Product.findById(id).populate("category").exec();

    if(!product){
        throw new Error("Product not found with id " + id);
    }
    return product
}

async function getAllProducts(reqQuery){
    let {category,color,sizes,minPrice,maxPrice,minDiscount,sort,stock,pageNumber,pageSize}=
    reqQuery;

     pageSize = pageSize || 10;

     let query = Product.find().populate("category");

     if(category){
        const existCategory = await Category.findOne({name:category});
        if(existCategory){
      query = query.where("category").equals(existCategory._id)
        }
        else{
            return {content:[],currentPage:1,totalPages:0}
        }
     }
 /////// 
     if(color){
        const colorSet = new Set(color.split(",").map(color =>color.trim().toLowerCase()));
        
        const colorRegex = colorSet.size>0?new RegExp([...colorSet].join("|"),"i"):null;

        query = query.where("color").regex(colorRegex)
     }

     if(sizes){
        const sizesSet=new Set(sizes);
        query =  query.where("sizes.name").in([...sizesSet]);
     }

     if(minPrice && maxPrice){
        query =  query.where("discountedPrice").gte(minPrice).lte(maxPrice);
     }

     if(minDiscount){
        query = query.where("discountPercent").gte(minDiscount);
     }
     if(stock){
        if(stock =="in_stock"){
            query =query.where("quantity").gt(0)
        }
        else if (stock =="out_of_stock"){
            query = query.where("quantity").gt(1)
        }
     }

     if (sort){
        const sortDirection = sort==="price_hight"?-1:1;
        query = query.sort({discountedPrice:sortDirection})
     }

     const totalProducts =await Product.countDocuments(query);

     const skip =(pageNumber )*pageSize;

     query = query.skip(skip).limit(pageSize)

     const products = await query.exec();

     const totalPages =Math.ceil(totalProducts/pageSize);
     return {content:products,currentPage:pageNumber,totalPages}

}

async function createMultipleproduct(products){
    for(let product of products){
        await createProduct(product)
    }
}


module.exports={
    createProduct,
    deleteproduct,
    updateproduct,
    findProductById,
    getAllProducts,
    createMultipleproduct

}
