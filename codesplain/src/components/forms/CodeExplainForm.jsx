import React from 'react'
import { useActionState } from 'react'
import { explain } from '../../actions'
import CodeExplanation from '../CodeExplanation'
import Error from '../Error'

const CodeExplainForm = () => {
  const [formState,formAction,isPending] = useActionState(explain,null)
  return (
    <div className='w-full max-4-4xl bg-white p-6 rounded-2xl shadow-lg'>
        <form action={formAction}>
            <label className='block mb-2 font-semibold text-black'>Language:</label>
            <select 
            name="language" 
            className='border rounded-lg p-2 w-full mb-4 bg-transparent'>
                <option value="javascript">JavaScript</option>
                <option value="Python">Python</option>
                <option value="java">Java</option>
            </select>

            <label className='block mb-2 font-semibold text-black'>Your Code:</label>
             <textarea
               name='code'
               required
               placeholder='Paste your code here....'
               className=' text-black border rounded-lg w-full p-3 font-mono text-sm bg-transparent min-h-[150px] '/>
             


             <button type="submit" disabled={isPending} class="mt-4 px-10 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 text-sm text-center leading-5">{isPending? "Explaining.." : "Explain Code" }</button>


        </form>
        {
          isPending ? (
            <p className='bg-gray-300 my-3 w-64 p-2 rounded-sm'>Thinking...</p>
          ) : formState?.success?(
            <CodeExplainForm explanation = {formState?.data.explanation}/>
          ) : (
              formState?.success===false &&(
                <Error error={formState?.error}/>
              )
          )
        }
    </div>
  )
}

export default CodeExplainForm