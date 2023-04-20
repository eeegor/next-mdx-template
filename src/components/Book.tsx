import Image from "next/image";
import Link from "next/link";

const emptyBook = {
  image: "http://placehold.it/30x30",
  slug: "",
  titleShort: "",
  titleLong: "",
  link: "/",
  description: "",
};

export const Book = ({ className = "", book = emptyBook }) => {
  return (
    <div className={`flex w-full my-8 ${className}`}>
      <div className="flex-shrink-0">
        <Image
          className="m-0 p-0"
          src={book.image}
          alt={book.titleShort}
          height="200"
          width="200"
        />
      </div>
      <div className="pl-6">
        <h3 className="p-0 m-0 mb-2 text-xl">{book.titleLong}</h3>
        <p className="mb-2">{book.description}</p>
        <span>
          <Link
            className="no-underline text-sm text-white bg-gray-500 hover:bg-gray-800 px-3 py-2 rounded-sm"
            href={book.link}
          >
            Buy now
          </Link>
        </span>
      </div>
    </div>
  );
};
