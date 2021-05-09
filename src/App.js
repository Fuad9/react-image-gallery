import React from "react";
import { useQuery } from "react-query";
import appStyles from "./styles/App.module.css";
import LinearProgress from "@material-ui/core/LinearProgress";
import Posts from "./Component/Posts";

export default function App() {
   const getPosts = async () =>
      await (
         await fetch(
            `https://my-json-server.typicode.com/Codeinwp/front-end-internship-api/posts`
         )
      ).json();

   const { data, isLoading, error } = useQuery("posts", getPosts);

   if (isLoading) return <LinearProgress />;
   if (error) return <div>Something went wrong ...</div>;

   return (
      <>
         <section className={appStyles.container}>
            <div className={appStyles.split}>
               <Posts data={data} />
            </div>
         </section>
      </>
   );
}
