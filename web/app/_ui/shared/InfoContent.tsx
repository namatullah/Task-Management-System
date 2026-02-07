import { InformationCircleIcon } from "@heroicons/react/24/outline";

const InfoContent = ({ text }: { text: string }) => {
  return (
    <div className="bg-red-100 text-red-500 px-4 py-2 text-sm rounded flex gap-2">
      <InformationCircleIcon className="w-5 h-5" /> {text}
    </div>
  );
};

export default InfoContent;
