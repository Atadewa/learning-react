/* eslint-disable react/prop-types */
export default function Header({ author }){
    return (<h1>Learn React with {author ? author : 'WPU'}</h1>);
}