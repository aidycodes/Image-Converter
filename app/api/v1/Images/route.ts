import { NextRequest } from 'next/server'
import sharp from 'sharp'
import { isValidFormat } from '@/lib/utils'



export async function POST(request: NextRequest) {
try {
 const contentType = request.headers.get('content-type')?.split(';')[0]  

 if(contentType !== 'multipart/form-data'){
    return Response.json({ message: 'No valid file provided' }, { status: 400 })
 }

    const formData = await request.formData()
    const file = formData.get('File')
    const format = formData.get('format')
console.log(format, 'format')
    if (!file || !(file instanceof File)) {
        return Response.json({ message: 'No valid file provided' }, { status: 400 })
    }

    if (!format || typeof format !== 'string' || !isValidFormat(format)) {
        return Response.json({ message: 'No valid format provided' }, { status: 400 })
    }
    console.log(format, 'format')
    const buffer = Buffer.from(await file.arrayBuffer())
    const convertedImageBuffer = await sharp(buffer).toFormat(format).toBuffer()
    
    return new Response(convertedImageBuffer, {
        status: 200,
        headers: {
            'Content-Type': `image/${format}`,
            'Content-Length': convertedImageBuffer.length.toString(),
        },
    })
} catch (error) {
    console.error(error)
    return Response.json({ message: 'Internal server error' }, { status: 500 })
}
}



//  this can be used if i want to add a url option to the api

// export async function POST(request: NextRequest) { 
//  const  url =  'fakeurl.com' //change this to url or better  a  variable from the request
//     const response = await fetch("")
    
//     const arrayBuffer = await response.arrayBuffer()
//     const buffer = Buffer.from(arrayBuffer)
    
//     const type = "jpeg"
//     const convertedImageBuffer = await sharp(buffer).toFormat(type).toBuffer()

//     return new Response(convertedImageBuffer, {
//         status: 200,
//         headers: {
//             'Content-Type': `image/${type}`,
//             'Content-Length': convertedImageBuffer.length.toString(),
//         },
//     })
// }

