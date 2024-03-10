

import React, { useState } from 'react';

const Popup = ({isOpen , onClose}) => {
//  const [isOpen, setIsOpen] = useState(true);

//  const togglePopup = () => {
//     setIsOpen(!isOpen);
//  };

 return (
    <div>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
          <div className="bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
               <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                 <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                     Sign In
                 </h3>
                 <div className="mt-2">
                    <p className="text-sm text-gray-500">
                       Please sign in to continue.
                    </p>
                 </div>
               </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm" onClick={onClose}>
               Ok
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
 );
};

export default Popup;
