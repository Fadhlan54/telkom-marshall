import { BiLoaderCircle } from "react-icons/bi";

export default function Loading({ width = 24, height = 24 }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <BiLoaderCircle
        className={`w-${width} h-${height} animate-spin-fast-to-slow`}
      />
      <p className="font-semibold text-xl mt-2">Fetching data</p>
    </div>
  );
}
