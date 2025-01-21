import { useState, type FormEvent } from "react";
import { AddressForm } from "./components/AddressForm";
import { InputZipcode } from "./components/Inputs/InputZipcode";
import { zipCodeApi } from "./services/addressService";
import type { AddressData } from "./types/index";

const App = () => {
    const [ addressData, setAddressData ] = useState<AddressData | null>(null);
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState<string | null>(null);
    const [ zipCode, setZipCode ] = useState("");

    const intl = {
        title: "Zip Code Lookup",
        isLoading: "Loading...",
        loaded: "Lookup",
        error: "error fetching address data."
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { data } = await zipCodeApi.zipcode({ code: zipCode }).get()
        if (data) {
            setAddressData(data);
            setLoading(false);
        }
        else {
            setError(intl.error);
            setLoading(false);
        }
    }
    return (
        <article className="sm:prose-lg md:prose-xl lg:prose-2xl xl:prose-3xl m-2 grid place-items-center">
            <h1 className="sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-sky-400">{intl.title}</h1>
            <form onSubmit={handleSubmit} className="flex flex-wrap sm:flex-col md:flex-row gap-2 justify-center">
                <InputZipcode onChange={setZipCode} disabled={loading} />
                <button
                    className="btn bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded text-sm md:text-base lg:text-lg xl:text-xl w-auto"
                    type="submit"
                    disabled={loading}
                >
                    {loading ? intl.isLoading : intl.loaded}
                </button>
            </form>
            {error && <p className="sm:text-sm md:text-base lg:text-lg xl:text-xl text-red-400">{error}</p>}
            {addressData && <AddressForm addressData={addressData} />}
        </article>
    );
};

export default App;
