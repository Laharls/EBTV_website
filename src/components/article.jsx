import Image from "next/image";
import Link from "next/link";

const Article = ({ data }) => {
    return (
        <div className="h-48 w-fit border border-transparent hover:border hover:border-blue-400 hover:bg-white hover:bg-opacity-50 ease-in-out duration-200">
            <div>
                <Link href={data.url}>
                    <Image src={data.src} alt="" width={250} height={250} />
                    <h2 className={`text-center text-md font-semibold ${data.containBrTag ? "" : "mt-4"}`}>{data.title}</h2>
                </Link>
            </div>
        </div>
    )
}

export default Article;