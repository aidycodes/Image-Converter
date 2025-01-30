import { Upload, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Features = {
  title: string;
  description: string;
  icon: React.ReactNode;
  classNames: string;
};

const features: Features[] = [
  {
    title: "Drag & Drop",
    description: "Simple drag and drop interface",
    icon: <Upload className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
    classNames: "bg-blue-100 dark:bg-blue-900",
  },
  {
    title: "Multiple Formats",
    description: "Convert to PNG, JPG, WebP, and GIF and more!",
    icon: <ImageIcon className="w-6 h-6 text-green-600" />,
    classNames: "bg-green-100 dark:bg-green-900",
  },
  {
    title: "Fast Processing",
    description: "Quick and efficient conversion",
    icon: <Upload className="w-6 h-6 text-purple-600 dark:text-purple-400" />,
    classNames: "bg-purple-100 dark:bg-purple-900",
  },
];

export const Features = () => {
  return (
    <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3 mb-auto ">
      {features.map(({ title, description, icon, classNames }) => (
        <div key={title} className="text-center">
          <div className={cn("rounded-lg p-3 inline-block", classNames)}>
            {icon}
          </div>
          <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-gray-300">
            {title}
          </h3>
          <p className="mt-2 text-gray-500 dark:text-gray-200">{description}</p>
        </div>
      ))}
    </div>
  );
};
