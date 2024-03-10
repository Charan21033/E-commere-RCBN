/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
import React, { Fragment, useState,useEffect } from 'react'
import { Dialog, Popover, Tab, Transition } from '@headlessui/react'
import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline'
import {useNavigate} from "react-router-dom"
import Avatar from '@mui/material/Avatar';
import {deepPurple} from "@mui/material/colors"
import {Menu,MenuItem,Button } from '@mui/material';
import AuthModal from '../../Auth/AuthModal.jsx';
import {useDispatch,useSelector} from "react-redux"
import { getUser, logout } from '../../../State/Auth/Action.js';
import {useLocation} from "react-router-dom"
import { getCart } from '../../../State/Cart/Action.js';
import img from  "../logo/enterprice.jpg"
import Tooltip from '@mui/material/Tooltip'; 
const VerifiedSticker = () => {
  return (
    <>
      <style>
        {`
          @keyframes flashing {
            0% { opacity: 1; }
            50% { opacity: 0; }
            100% { opacity: 1; }
          }

          .flashing-signal {
            animation: flashing 1s infinite;
          }
        `}
      </style>
     <div className="flex justify-center items-center h-4 w-4 rounded-full bg-green-500 text-white object-contain flashing-signal">
       ✓
     </div>
     </>
  );
 };
const navigation = {
  
  categories: [
    {
      id: 'women',
      name: 'Women ▼',
      featured: [
        {
          name: 'New Arrivals',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
          imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
        },
        {
          name: 'Basic Tees',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg',
          imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
        },
      ],
      sections: [
        {
          id: 'clothing',
          name: 'Clothing',
          items: [
            { name: `Tops `  ,  id:"top", href: `{women/clothing/tops}` },
            { name: 'Dresses',id:"women_dress" ,href: '#' },
            { name: 'Women Jeans', id:"women_jeans" },
            { name: 'Lengha Choli',id:"lengha_choli" },
            { name: 'shoes', id: 'shoes' },
            { name: 'T-Shirts',id: "t-shirt" },
            { name: 'Trending Wear', id:"Dress"},
            { name: 'Gouns', id:"gouns" },
            { name: 'Sarees',id:"saree" },
            {name:  "kurtas", id: "kurtas" },
          ],
        },
        {
          id: 'accessories',
          name: 'Accessories',
          items: [
            { name: 'Watches', id:"watch" },
            { name: 'Wallets', id:"wallet" },
            { name: 'Bags', id:"bag" },
            { name: 'Sunglasses', id:"sunglasse" },
            { name: 'Hats', id:"hat"},
            { name: 'Belts', id:"belt" },
          ],
        },
        {
          id: 'brands',
          name: 'Brands',
          items: [
            { name: 'Full Nelson', id: '#' },
            { name: 'My Way', id: '#' },
            { name: 'Re-Arranged', id: '#' },
            { name: 'Counterfeit', id: '#' },
            { name: 'Significant Other', id: '#' },
          ],
        },
      ],
    },
    {
      id: 'men',
      name: 'Men ▼',
      featured: [
        {
          name: 'New Arrivals',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg',
          imageAlt: 'Drawstring top with elastic loop closure and textured interior padding.',
        },
        {
          name: 'Artwork Tees',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg',
          imageAlt:
            'Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.',
        },
      ],
      sections: [
        {
          id: 'clothing',
          name: 'Clothing',
          items: [
            { name: 'Mens kurtas', id:"mens_kurta" },
            { name: 'Shirt',id:"shirt"  },
            { name: 'Men jeans',id:"men_jeans" },
            { name: 'Sweaters', id: '#' },
            { name: 'T-Shirts', id:"t-shirt" },
            { name: 'jackets',id:"#"  },
            { name: 'shoes', id: 'shoes' },
          ],
        },
        {
          id: 'accessories',
          name: 'Accessories',
          items: [
            { name: 'Watches', id: '#' },
            { name: 'Wallets', id: '#' },
            { name: 'Bags', id: '#' },
            { name: 'Sunglasses', id: '#' },
            { name: 'Hats', id: '#' },
            { name: 'Belts', id: '#' },
          ],
        },
        {
          id: 'brands',
          name: 'Brands',
          items: [
            { name: 'Re-Arranged', id: '#' },
            { name: 'Counterfeit', id: '#' },
            { name: 'Full Nelson', id: '#' },
            { name: 'My Way', id: '#' },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: 'Company ', id: '/' },
    { name: 'Stores ', id: '/' },
  ],
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navigation() {
 
  const [open, setOpen] = useState(false)
  const navigate=useNavigate()
  const location =useLocation()
  
 const [openAuthModal,setOpenAuthModal]= useState(false);

const [anchorE1,setAnchorE1]=useState(null);
const openUserMenu =Boolean(anchorE1);
const jwt =localStorage.getItem("jwt")
const {auth} = useSelector(store =>store);
const dispatch =useDispatch()
const {cart} = useSelector(store =>store)
// console.log("cart from navigation",cart)

useEffect(()=>{
  dispatch(getCart())
},[cart.updateCartItem,cart.deleteCartItem])

// console.log("csdcndsncks",cart.cart?.totalItem)

const handleUserClick =(event)=>{
  setAnchorE1(event.currentTarget);
}
const handleCloseUserMenu =(event)=>{
  setAnchorE1(null);
}
const handleOpen =()=>{
  setOpenAuthModal(true);
}
const handleClose=()=>{
   setOpenAuthModal(false);
   
}

  const handleCategoryClick =(category,section,item,close) =>{
    navigate(`/${category.id}/${section.id}/${item.id}`);
  }
  useEffect(()=>{
    if(jwt){
      dispatch(getUser(jwt))
    }
    
   },[jwt,auth.jwt])
  

  useEffect(()=>{
    if(auth.user){
      handleClose()
    }
     if(location.pathname === "/login" || location.pathname==="/register"){
      navigate(-1)
     }
  },[auth.user])



  const handleLogOut=()=>{
    
    dispatch(logout())
    handleCloseUserMenu();
    navigate("/")
    window.location.reload()
    
  }

  const handleCartClick = (e) => {
    e.preventDefault(); 
    navigate('/cart'); 
 };

 const isItemVerified = (itemId) => {
  // This is a placeholder. Replace with your actual logic to check if an item is verified.
  const verifiedItems = ['top', 'women_dress',"Dress", 'women_jeans', 'lengha_choli', 'shoes', 'gouns', 'kurtas', 'mens_kurta', 'shirt', 'men_jeans', 'shoes'];
  return verifiedItems.includes(itemId);
 };

  return (
    <div className="bg-white">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-5">
                  <button
                    type="button"
                    className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Links */}
                <Tab.Group as="div" className="mt-2">
                  <div className="border-b border-gray-200">
                    <Tab.List className="-mb-px flex space-x-8 px-4">
                      {navigation.categories.map((category) => (
                        <Tab
                          key={category.name}
                          className={({ selected }) =>
                            classNames(
                              selected ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-900',
                              'flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium'
                            )
                          }
                        >
                          {category.name}
                        </Tab>
                      ))}
                    </Tab.List>
                  </div>
                  <Tab.Panels as={Fragment}>
                    {navigation.categories.map((category) => (
                      <Tab.Panel key={category.name} className="space-y-10 px-4 pb-8 pt-10">
                        <div className="grid grid-cols-2 gap-x-4">
                          {category.featured.map((item) => (
                            <div key={item.name} className="group relative text-sm">
                              <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                <img src={item.imageSrc} alt={item.imageAlt} className="object-cover object-center" />
                              </div>
                              <a href={item.id} className="mt-6 block font-medium text-gray-900">
                                <span className="absolute inset-0 z-10" aria-hidden="true" />
                                {item.name}
                              </a>
                              <p aria-hidden="true" className="mt-1">
                                Shop now
                              </p>
                            </div>
                          ))}
                        </div>
                        {category.sections.map((section) => (
                          <div key={section.name}>
                            <p id={`${category.id}-${section.id}-heading-mobile`} className="font-medium text-gray-900">
                              {section.name}
                            </p>
                            <ul
                              role="list"
                              aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                              className="mt-6 flex flex-col space-y-6"
                            >
                              {section.items.map((item) => (
                                <li key={item.name} className="flow-root">
                                  <a href={item.id} className="-m-2 block p-2 text-gray-500">
                                    {item.name}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </Tab.Panel>
                    ))}
                  </Tab.Panels>
                </Tab.Group>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  {navigation.pages.map((page) => (
                    <div key={page.name} className="flow-root">
                      <a href={page.href} className="-m-2 block p-2 font-medium text-gray-900">
                        {page.name}
                      </a>
                    </div>
                  ))}
                </div>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  <div className="flow-root">
                    <a href="#" className="-m-2 block p-2 font-medium text-gray-900">
                      Sign in
                    </a>
                  </div>
                  <div className="flow-root">
                    <a href="#" className="-m-2 block p-2 font-medium text-gray-900">
                      Create account
                    </a>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6">
                  <a href="#" className="-m-2 flex items-center p-2">
                    <img
                      src="https://tailwindui.com/img/flags/flag-canada.svg"
                      alt=""
                      className="block h-auto w-5 flex-shrink-0"
                    />
                    <span className="ml-3 block text-base font-medium text-gray-900">CAD</span>
                    <span className="sr-only">, change currency</span>
                  </a>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="relative bg-white z-50">
        <p className="flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
          Get free delivery on orders over ₹999
        </p>

        <nav aria-label="Top" className="mx-auto max-w-7xl  px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <button
                type="button"
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <div class="group relative">
              <div className="ml-4 flex lg:ml-0">
                <a href="" onClick={()=>navigate("/")} >
                  <span className="sr-only">Your Company</span>
                  <img
                    className="h-8 w-auto  "
                    src={img}
                    alt=""
                  />
                  <span class="absolute top-0 left-0 mt-10 ml-0 px-2 py-1 bg-gray-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
    Home
 </span>
                </a>
              </div>
              </div>

              {/* Flyout menus */}
              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      {({ open }) => (
                        <>
                          <div className="relative flex">
                            <Popover.Button
                              className={classNames(
                                open
                                  ? 'border-indigo-600 text-indigo-600'
                                  : 'border-transparent text-gray-700 hover:text-gray-800',
                                'relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out'
                              )}
                            >
                              {category.name}
                            </Popover.Button>
                          </div>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Popover.Panel className="absolute inset-x-0 top-full text-sm text-gray-500">
                              {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                              <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />

                              <div className="relative bg-white">
                                <div className="mx-auto max-w-7xl px-8">
                                  <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16 z-50 bg-white">
                                    <div className="col-start-2 grid grid-cols-2 gap-x-8 z-50 bg-white">
                                      {category.featured.map((item) => (
                                        <div key={item.name} className="group relative text-base sm:text-sm z-50 bg-white">
                                          <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                            <img
                                              src={item.imageSrc}
                                              alt={item.imageAlt}
                                              className="object-cover object-center z-50"
                                            />
                                          </div>
                                          <a href={item.id} className="mt-6 block font-medium text-gray-900">
                                            <span className="absolute inset-0 z-50" aria-hidden="true" />
                                            {item.name}
                                          </a>
                                          <p aria-hidden="true" className="mt-1">
                                            Shop now
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                    <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm bg-white z-50">
                                      {category.sections.map((section) => (
                                        <div key={section.name} className=' z-50 bg-white'>
                                          <p id={`${section.name}-heading`} className="font-medium text-gray-900">
                                            {section.name}
                                          </p>
                                          <ul
                                            role="list"
                                            aria-labelledby={`${section.name}-heading`}
                                            className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                          >
                                            {section.items.map((item) => (
                                              <li key={item.name} className="flex">
                                                {/* <a href={item.href} className="hover:text-gray-800">
                                                  {item.name}
                                                </a> */}
                                                <p onClick={()=>
                                                handleCategoryClick(category,section,item)
                                                }
                                                className=' cursor-pointer hover:text-gray-800 flex justify-center items-center space-x-4'>
                                                 {item.name}
                                                 {isItemVerified(item.id) && <VerifiedSticker /> }
                                                </p>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  ))}

                  {navigation.pages.map((page) => (
                    <a
                      key={page.name}
                      href={page.href}
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      {page.name}
                    </a>
                  ))}
                </div>
              </Popover.Group>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {/* <a href="#" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                    Sign in
                  </a>
                  <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                  <a href="#" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                    Create account
                  </a>
                </div>

                <div className="hidden lg:ml-8 lg:flex">
                  <a href="#" className="flex items-center text-gray-700 hover:text-gray-800">
                    <img
                      src="https://tailwindui.com/img/flags/flag-canada.svg"
                      alt=""
                      className="block h-auto w-5 flex-shrink-0"
                    />
                    <span className="ml-3 block text-sm font-medium">CAD</span>
                    <span className="sr-only">, change currency</span>
                  </a>
                </div> */}

                { auth.user?.firstName?(
                  <div>
                    <Avatar
                    className="text-white"
                    onClick={handleUserClick}
                    aria-controls={open? "basic-menu" :undefined}
                    aria-haspopup="true"
                    aria-expanded={open?"true":undefined}
                    sx={{
                      bgcolor:deepPurple[500],
                      color:"white",
                      cursor:"pointer"
                    }}>
                        {auth.user?.firstName[0].toUpperCase()}
                      
                    </Avatar>
                    <Menu
                      // sx={{transform: "translateX(76%) translateY(-69%) "}}
                      
                    id="basic-menu"
                    anchorEl={anchorE1}
                    open={openUserMenu}
                    onClose={handleCloseUserMenu}
                    MenuListProps={{
                      "aria-labelledby":"basic-button",
                    }}
                    >
                      <MenuItem 
                    
                      onClick={handleCloseUserMenu}
                      >Profile</MenuItem>
                      <MenuItem
                      onClick={()=>navigate("/account/order")}
                      >My Orders</MenuItem>
                      <MenuItem onClick={handleLogOut}>LogOut</MenuItem>

                    </Menu>
                  
                </div>):(
                  <Button
                  onClick={handleOpen}
                  className="text-sm font-medium text-gray-700 hover:text-gray-800"
                  >Signin</Button>
                )}
                </div>

                {/* Search */}
                <div className="flex lg:ml-6">
                  <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Search</span>
                    <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                  </a>
                </div>

                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6"  >
                  {auth.user?  <a href="#" className="group -m-2 flex items-center p-2" onClick={handleCartClick} >
        
                    <ShoppingBagIcon
                      className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{cart.cart?.totalItem}</span>
                    <span className="sr-only">items in cart, view bag</span>
                  </a> : (
        <Tooltip title="Sign in first" arrow>
          <span className="group -m-2 flex items-center p-2 cursor-not-allowed">
            <ShoppingBagIcon
              className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
              aria-hidden="true"
            />
            <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{cart.cart?.totalItem}</span>
            <span className="sr-only">items in cart, view bag</span>
          </span>
        </Tooltip>
      ) }


                  
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <AuthModal open={openAuthModal} handleClose={handleClose} />
    </div>
  )
  
}

