

    import React from 'react'
    
    const AddNewEmpolyee = () => {
      return (
        
        <div className="flex h-full w-full flex-col items-center justify-center">
          <h1 className="text-2xl font-bold text-navy-700 dark:text-white">
            اضافة موظف جديد
          </h1>
          <p className="mt-2 text-base text-gray-600 dark:text-gray-400">
            يمكنك اضافة موظف جديد من خلال النموذج التالي
          </p>

          <div className="mt-5 w-full max-w-md">
            <form className="space-y-4">
              <div>

                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  الاسم الكامل
                </label>
                <input
                  type="text"
                  className="mt-1 block h-[40px] border-blue-300 w-full border rounded-md shadow-sm focus:border-brand-500 focus:ring-brand-500 dark:bg-gray-800 dark:text-white"
                  placeholder="ادخل الاسم الكامل"
                />
                </div>
                <div>   
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  البريد الإلكتروني
                </label>
                <input
                    type="email"
                    className="mt-1 block w-full rounded-md h-[40px] border border-blue-300  shadow-sm focus:border-brand-500 focus:ring-brand-500 dark:bg-gray-800 dark:text-white"
                    placeholder="ادخل البريد الإلكتروني"
                />
                </div>
                <div>
                <label className="block text-sm font-medium text-gray-700   dark:text-gray-300">
                    رقم الهاتف
                </label>
                <input
                    type="tel"
                    className="mt-1 block w-full rounded-md h-[40px] border border-blue-300  shadow-sm focus:border-brand-500 focus:ring-brand-500 dark:bg-gray-800 dark:text-white"
                    placeholder="ادخل رقم الهاتف"
                />
                </div>
                <button
                  type="submit"
                  className="w-full h-[40px] bg-brand-500 text-white font-semibold rounded-md hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
                >
                    اضافة موظف
                </button>
        
          {/* Add form or components for adding new employee here */}
        </form>
        </div>
        </div>
      )
    }
    
    export default AddNewEmpolyee