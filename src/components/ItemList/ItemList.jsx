import Item from "../Item/Item";

//Modifico el array de objetos. 
const ItemList = ({productsList}) => {
    console.log(productsList);

    return (        
        <>
            {productsList.map((product) => (
            <Item key={product._id} prod={product}/>
            ))}
        </>  
        
    );
} 

export default ItemList;