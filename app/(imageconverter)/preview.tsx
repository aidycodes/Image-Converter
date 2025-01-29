'use client'

import Image from "next/image";
import { saveAs } from 'file-saver';


interface PreviewProps {
    convertedImage?: string;
    selectedFormat: string;
    convertedImageType: string;
}

const Preview = ({convertedImage, convertedImageType }: PreviewProps) => {

    return(
        <div>
        {convertedImage ? (
        <div>
            
            <div className="relative aspect-square w-full mb-4 bg-gray-100 rounded-lg overflow-hidden h-[400px] ">
            <Image
                src={convertedImage}
                alt="Converted preview"
                className="object-contain w-full h-full cursor-pointer"
                onClick={() => window.open(convertedImage)}
                width={400}
                height={400}       
            />
            </div>
            <button
            className="w-full flex items-center justify-center space-x-2 bg-green-600 text-white rounded-md py-2 px-4 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            onClick={() => saveAs(convertedImage, `${convertedImage.split('/')[3]}.${convertedImageType.split('/')[1]}`)}
            >
            {/* <Download className="w-5 h-5" /> */}
            <span>Download {convertedImageType.toUpperCase()}</span>
            </button>
        </div>
        ) : (
        <div className="h-full flex items-center justify-center">
            <div className="text-center text-gray-500">
            
            <p>Preview will appear here after conversion</p>
            </div>
        </div>
        )}
        </div>
        )
}

export default Preview