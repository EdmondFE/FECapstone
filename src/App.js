import MainApp from './AIscript';
import { useForm, FormProvider } from 'react-hook-form';
export default function App() {
    const methods = useForm();
    return (
        <>
            <FormProvider {...methods}>
                <MainApp/>
            </FormProvider>
        </>
    );
}
