import toast, { Toaster } from 'solid-toast';

export default function Messages () {
    return (
        <Toaster
        position="top-center"
        // Spacing between each toast in pixels
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options that each toast will inherit. Will be overwritten by individual toast options
          className: '',
          duration: 2000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
    )
}

export function addErrorMessage(msg: string){
    toast.error(msg)
}

export function addSuccessMessage(msg: string){
    toast.success(msg)
}