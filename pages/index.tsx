import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { ChangeEvent, FunctionComponent, useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';

type Item = {
  todo: string;
  id: string;
};
export const Item: FunctionComponent<Item> = ({ todo , id }) => { 

  const handleDeleteItem = async () =>{
      await fetch(`${process.env.NEXT_PUBLIC_API}`, {method:"DELETE", 
    body :
      JSON.stringify({id})
    })
  }
  return <div className="even:bg-gray-100 odd:bg-gray-50 hover:bg-gray-200  w-1/2 h-7 rounded-sm m-2 flex justify-between"><div>{todo}</div><button onClick={handleDeleteItem} className="bg-red-500 w-5 rounded cursor-pointer">-</button></div>
 };
export const Heading: FunctionComponent = () =>
(
  <div className="h-8 font-medium text-4xl mb-12">
    Todo App:
  </div>
)
const Home: NextPage = () => {
  const [items, setItems] = useState<Item[] | null>(null);
  const [item, setItem] = useState('')
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API}`)
      .then((data) => data.json())
      .then((data) => setItems(data));
  }, []);
  const handleChange = (e : ChangeEvent<HTMLInputElement>) =>{
    setItem(e.target.value)  
  }
  const handleAddItem = async ()=>{
      await fetch(`${process.env.NEXT_PUBLIC_API}`, {method:"POST", 
    body :
      JSON.stringify({todo: item})
    })
  }

  return (
    <div className="h-screen text-center flex-col flex justify-center  w-full items-center">
      <Heading />
      <div className="mb-10">
      Add new:<input type="text" className="shadow-lg mx-8" value={item} onChange={handleChange}/>
      <button className="bg-blue-500 w-12 rounded-md drop-shadow-md" onClick={handleAddItem}>add</button>
      </div>
      {items?.length && items.map(({id , todo} ) => <Item todo={todo || 'noname'} key={id} id={id}/>)}
    </div>
  );
};

export default Home;
