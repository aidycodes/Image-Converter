'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from "@tanstack/react-query";
import { useEffect } from 'react';
import { ModeToggle } from '@/components/DarkModeToggle';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import UploadPanel from './upload';
import Preview from './preview';
import { Features } from '@/components/features';

export const ImageConverter = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [selectedFormat, setSelectedFormat] = useState('png');
    const [image, setImage] = useState<string | null>(null);
    const [tab, setTab] = useState('upload')
    const [convertedImageType, setConvertedImageType] = useState<string>(selectedFormat)
  
  
    const router = useRouter()
  
    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
          setSelectedFile(file);
        }
      }
    };
  
    const { mutate, isPending } = useMutation({
      mutationFn: (data: any) => {
        const formData = new FormData()
        formData.append("File", data)
        formData.append("format", selectedFormat)
  
        return fetch("/api/v1/Images", {
          method: "POST",
          body: formData,
          
        })
      },
      
      onSuccess: async(data) => {
         const blob = await data.blob()
         const url = URL.createObjectURL(blob)
         console.log(blob, 'blob')
         setImage(url)
         setConvertedImageType(blob.type)
        
      }
  })
  const handleSubmit = (data: any) => {
      mutate(data);
    };
  
  useEffect(() => {
      if(image){
          setTab('preview')
      }   
  }, [image])

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 bg-gray-100 dark:bg-[var(--background)]">
      <ModeToggle/>
      <div className="max-w-3xl mx-auto ">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 dark:text-gray-300">Image Converter</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">Convert your images to any format with ease</p>
        </div>
       
        {/* main  */}
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-lg p-8 lg:h-[780px] ">
            <Tabs defaultValue="upload" value={tab}>
        <TabsList>
            <TabsTrigger onClick={() => setTab('upload')} value="upload">Upload</TabsTrigger>
            <TabsTrigger onClick={() => setTab('preview')} disabled={!image} value="preview">Preview</TabsTrigger>
        </TabsList>
            <TabsContent value="upload"> <UploadPanel isPending={isPending} selectedFile={selectedFile} selectedFormat={selectedFormat} setSelectedFormat={setSelectedFormat} setSelectedFile={setSelectedFile} handleFileInput={handleFileInput} handleSubmit={handleSubmit} /></TabsContent>
            <TabsContent value="preview"><Preview convertedImage={image || undefined} selectedFormat={selectedFormat} convertedImageType={convertedImageType} /></TabsContent>
        </Tabs>
           <Features/>
        
      </div>
    </div>
    </div>
  );
};