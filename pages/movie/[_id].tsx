import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import clientPromise from "../../lib/mongodb";
import { useParams } from "next/navigation";

type ConnectionStatus = {
    data: any;
  };
  
    export const getServerSideProps: GetServerSideProps< ConnectionStatus> = async (context) => {
    try {
      await clientPromise;
      const id = context.params?._id
      const res = await fetch(`${process.env.BASE_URI}/api/movies/${id}`);
      const data = await res.json();
      return {
        props: { data },
      };
    } catch (e) {
      console.error(e);
      return {
        props: { data: {} },
      };
    }
  };

export default function ({data}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return <div>
        <div className="">
            <img src={data.poster} alt={data.title}/>
        </div>
        <div>
        <h2>{data.title}</h2>
        <h3>{data.metacritic}</h3>
        <p>{data.pilot}</p>
        <p>{data.fullplot}</p>
        </div>
    </div>;
}