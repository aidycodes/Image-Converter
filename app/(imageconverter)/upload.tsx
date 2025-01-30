'use client'

import React from 'react';
import { useState } from "react";
import { Upload, Image as ImageIcon, ArrowRight, X, CircleCheck } from 'lucide-react';
import { Loader2 } from 'lucide-react';

interface UploadPanelProps {
    handleFileInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (data: File | null) => void;
    selectedFile: File | null;
    selectedFormat: string;
    setSelectedFormat: (format: string) => void;
    setSelectedFile:  React.Dispatch<React.SetStateAction<File | null>>
    isPending: boolean;
}

const UploadPanel = ({handleFileInput, handleSubmit, selectedFile, selectedFormat, setSelectedFormat, setSelectedFile, isPending}: UploadPanelProps) => {
    const [isDragging, setIsDragging] = useState(false);


    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
      };
    
      const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
      };
    
      const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
          setSelectedFile(file);
        }
      };
    return (
        <>
            <div
            className={`border-2 flex items-center flex-col justify-center border-dashed rounded-lg lg:h-[300px] p-4 text-center ${isPending ? 'cursor-not-allowed' : 'cursor-pointer'} transition-colors relative
              ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => isPending ? null :  document.getElementById('fileInput')?.click()}        
          >
            {isPending ? <div className="bg-black absolute top-0 left-0 w-full h-full opacity-50" /> : null}
          
                <input
                disabled={isPending}
              type="file"
              id="fileInput"
              className="hidden"
              accept="image/*"
              onChange={handleFileInput}
            />
            { isPending ? <Loader2 className="w-16 h-16 mx-auto mb-4 text-blue-300 dark:text-blue-800 animate-spin" /> : selectedFile ? <CircleCheck className="w-16 h-16 mx-auto mb-4 text-green-500 dark:text-green-400" /> : <Upload className="w-16 h-16 mx-auto mb-4 text-blue-300 dark:text-blue-800" />}
            <p className="text-lg mb-2 font-medium text-gray-900 dark:text-gray-300">
              {selectedFile ? "Image Selected" : isPending ? "Converting..." : "Drag and drop your image here"}
            </p>
            <p className="text-gray-500 dark:text-gray-300"> {selectedFile ? "Click to change" : isPending ? "..." : " click to browse"}</p>
          
         
            </div>
          {/* Selected File Info */}

         
            <div className="flex items-center">
            <div className="mt-6 p-4 bg-gray-50 rounded-lg flex items-center flex-1 dark:bg-zinc-800 dark:border-2 dark:border-gray-700 dark:shadow-md ">
              <ImageIcon className="w-6 h-6 text-gray-500 mr-3 dark:text-gray-400" />
              <span className="text-gray-700 font-medium dark:text-gray-400">{!selectedFile ? "Select An Image" : selectedFile?.name} </span>
            </div> 
                <X size={24}  className="ml-2 mb-2 text-gray-400 mt-8 hover:text-red-500 cursor-pointer hover:bg-transparent" onClick={() => setSelectedFile(null)} />
            </div>
          

          {/* Conversion Options */}
          <div className="mt-8">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-2">
                  Convert to
                </label>
                <select
                  className="w-full dark:text-gray-400 p-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-zinc-800 dark:border-2 dark:border-gray-700 dark:shadow-md"
                  value={selectedFormat}
                  onChange={(e) => setSelectedFormat(e.target.value)}
                >
                  <option   value="png">PNG</option>
                  <option value="jpg">JPG</option>
                  <option value="webp">WebP</option>
                  <option value="gif">GIF</option>
                  <option value="tiff">TIFF</option>
                  <option value="avif">AVIF</option>
                 
                  
                </select>
              </div>
              <ArrowRight className="w-6 h-6 text-gray-400 mt-8" />
              <div className="flex-1 mt-8">
                <button
                  className="w-full dark:bg-blue-800 dark:text-gray-100 dark:hover:bg-blue-700 dark:hover:text-gray-50 bg-blue-600 text-white rounded-md py-2 px-4 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!selectedFile || isPending}
                  onClick={() => {
                    handleSubmit(selectedFile)
                  }}
                >
                  {isPending ? "Converting..." : "Convert Now"}
                </button>
              </div>
            </div>
          </div>
          </>
        
        
    )
        
}

export default UploadPanel