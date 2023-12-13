import { MouseEventHandler } from "react";

export interface CustomButtonProps {
  isDisabled?: boolean;
  btnType?: "button" | "submit";
  containerStyles?: string;
  textStyles?: string;
  title: string;
  rightIcon?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
}


export interface Article {
    id:number;
    title: string;
    url: string;
    source: string;
    img: string;
  }


export interface SearchNewspapersProps {
  newspapers:string;
  setNewspapers:(newspapers:string)=>void

}

export interface SearchButtonProps {
  isSearched:boolean;
  setIsSearched:(isSearched:boolean)=>void

}

export interface NewspaperProps {
  id:number;
  title: string;
  url: string;
  source: string;
  img: string;

}

export interface FilterProps {
  keyword:string | null,
  newspapers:string | null
  page:string | null;
}



export interface HomeProps {
  searchParams: FilterProps;
}


export interface ShowMoreProps {
  pageNumber: number;
  isNext: boolean;
}
  