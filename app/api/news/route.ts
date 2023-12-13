import { newspapers } from "@/constants/index"
import { Article } from "@/types";
import axios from "axios";
import * as cheerio from 'cheerio';
import { NextResponse, NextRequest } from 'next/server';
const {URLSearchParams} = require('url')


export const  GET = async (req: NextRequest ) => {

 
    const {searchParams} = new URL(req.url)
    const mysearchparams = searchParams.get('keyword')
   // const mysearchparamsNewspapers = searchParams.get('newspapers')

    const articles: Article[] = [];
    const uniqueArticles = new Set();
  



  /*   const encodedParams = new URLSearchParams();

    encodedParams.set('source_language', 'en');
    encodedParams.set('target_language', 'ru');
    encodedParams.set('text', mysearchparams);
    const options = {
    method: 'POST',
    url: 'https://text-translator2.p.rapidapi.com/translate',
    headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': '0a836b619amsh1b59fd8f594d42cp1fb5a1jsndcd1e55207b6',
        'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
    },
    data: encodedParams,
    };
 */
/*     const encodedParamsES = new URLSearchParams();

    encodedParamsES.set('source_language', 'en');
    encodedParamsES.set('target_language', 'es');
    encodedParamsES.set('text', mysearchparams);
    const optionsES = {
    method: 'POST',

    data: encodedParamsES,
    }; */



    try {
      /*  const responseTranslatedES = await axios.request(optionsES)
        const translatedTextES = responseTranslatedES.data.data.translatedText
      console.log(translatedTextES) */
      for (const newspaper of newspapers) {
 
        const response = await axios.get(newspaper.address);
        const html = await response.data;
        const $ = cheerio.load(html);
  
        if (mysearchparams) {
          const keywordRegex = new RegExp(mysearchparams, 'i');
  
          $('a').each(function () {
            const titleText = $(this).text();
            if (keywordRegex.test(titleText)) {
              const title = titleText.replace(/\s+/g, ' ').trim();
              const url = $(this).attr('href');
              const articleIdentifier = `${title}_${newspaper.address}`;
            
              if (!uniqueArticles.has(articleIdentifier)) {
                uniqueArticles.add(articleIdentifier);
  
                articles.push({
                  id: Math.random(),
                  title,
                  url: newspaper.base + url,
                  source: newspaper.address,
                  img: newspaper.img,
                });
              }
            }
          });
        }
      }
      

    return new Response(JSON.stringify({ message: articles }), { status: 200 });


    }catch(error){
        console.log(error)
    }
};
