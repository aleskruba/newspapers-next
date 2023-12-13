import { newspapers } from "@/constants/index"
import { Article } from "@/types";
import axios from "axios";
import * as cheerio from 'cheerio';
import { NextRequest, NextResponse } from "next/server";
const {URLSearchParams} = require('url')

export async function GET(req: NextRequest ,{ params }: { params: { id: string } } ) {
  

  
    const {searchParams} = new URL(req.url)
    const mysearchparams = searchParams.get('keyword')

    const newspaperAddress = newspapers.filter(newspaper => newspaper.name == params.id)[0].address
    const newspaperBase = newspapers.filter(newspaper => newspaper.name ==  params.id)[0].base
    const newspaperImg = newspapers.filter(newspaper => newspaper.name ==  params.id)[0].img

const newspaperBaseII =''

    const specificArticles: Article[] = [];

    const uniqueArticles = new Set();

/*     const encodedParams = new URLSearchParams();

    encodedParams.set('source_language', 'en');
    encodedParams.set('target_language', 'ru');
    encodedParams.set('text', mysearchparams);
    const options = {
    method: 'POST',
    url: 'https://text-translator2.p.rapidapi.com/translate',

    data: encodedParams,
    }; */



   /*  const encodedParamsES = new URLSearchParams();

    encodedParamsES.set('source_language', 'en');
    encodedParamsES.set('target_language', 'es');
    encodedParamsES.set('text', mysearchparams);
    const optionsES = {
    method: 'POST',
    url: 'https://text-translator2.p.rapidapi.com/translate',

    data: encodedParamsES,
    }; */

    try {


        //const responseTranslated = await axios.request(options);
       // const translatedText = responseTranslated.data.data.translatedText
     //  const translatedText = ''

       // const responseTranslatedES = await axios.request(optionsES);
//        const translatedTextES = responseTranslatedES.data.data.translatedText
       // const translatedTextES = ''

          const response = await axios.get(newspaperAddress);
          const html = response.data;
          const $ = cheerio.load(html);

          //console.log($)
  
          if (mysearchparams) {
          const keywordRegex = new RegExp(mysearchparams, 'i'); // 'i' flag for case-insensitive matching
            console.log(keywordRegex)
         // const translatedWordRegex = new RegExp(translatedText, 'i');

        //  const translatedWordRegexES = new RegExp(translatedTextES, 'i');

          $('a').each(function () {
            const titleText = $(this).text();
            if (keywordRegex.test(titleText)) {
              const title = titleText.replace(/\s+/g, ' ').trim();
              const url = $(this).attr('href');
              const articleIdentifier = `${title}_${newspaperAddress}_${params.id}`;
              console.log(params.id)
            
              if (!uniqueArticles.has(articleIdentifier)) {
                uniqueArticles.add(articleIdentifier);


              specificArticles.push({
                id:Math.random(),
                title,
                url: (params.id === 'el pais' || params.id === 'china daily') ? newspaperBaseII + url : newspaperBase + url,

                source: newspaperAddress,
                img:newspaperImg
              });

            }
            }
          }); 
        }


  return new Response(JSON.stringify({ message: specificArticles }), { status: 200 });


        }catch(error){
            console.log(error)
        }
 };


