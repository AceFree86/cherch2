import Head from "next/head";
import Hstyle from "@/components/helpers/Hstyle";
import Layout from "@/components/Layout";
import React, { useState } from "react";
import { useRouter } from "next/router";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

   const news = {
     email: email,
     password: password,
   };
   

  const handleFormSubmit = async (e) => {
    e.preventDefault();
   const response = await fetch("/api/auth/register", {
     method: "POST",
     body: JSON.stringify(news),
   });
   if (response.ok) {
     router.push("/");
   } else {
    
   }
  };

  return (
    <>
      <Head>
        <title>Реєстрація Адміністратора</title>
        <meta name="description" content="any description" />
      </Head>
      <main className="bg-gray-50 flex w-full flex-col items-center justify-start mt-0 min-h-screen">
        <Layout className="pt-16 sm:pt-8">
          <div className="text-4xl md:text-3xl sm:text-2xl mb-5">
            <Hstyle text="Реєстрація Адміністратора" />
          </div>
          <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
            <div className="py-2 ">
              <form className="mx-auto max-w-xl" onSubmit={handleFormSubmit}>
                <div>
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    htmlFor="email_field"
                  >
                    Електронна пошта
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    htmlFor="password_field"
                  >
                    Пароль
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-10"
                >
                  Вхід
                </button>
              </form>
            </div>
          </div>
        </Layout>
      </main>
    </>
  );
};

export default Register;
