'use client'

export default function myImageLoader({src, width, quality}){
    if(src.startsWith("https://api.toornament.com")) return `${src}?w=${width}&$q=${quality || 75}`
    return `http://localhost:3000/${src}?w=${width}&q=${quality || 75}`
}