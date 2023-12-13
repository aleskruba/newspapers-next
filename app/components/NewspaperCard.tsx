
"use client"
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";




function NewspaperCard({newspaper}:any) {
  return (
    <Link href={newspaper.url} target="blank">
    <div className="newspaper-card">
    <div className="newspaper-card__title">{newspaper.title}  </div>
      <div className="absolute bottom-1 right-1 ">

          <Image src={newspaper.img} width={70} height={50} alt="image"/>

      </div>
     </div>  
     </Link>
  )
}

export default NewspaperCard