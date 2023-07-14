import Item from "../Item/Item";
import { Row } from 'react-bootstrap';
import 'bootstrap';
//Modifico el array de objetos. 
const ItemList = ({productsList}) => {
    
    function renderItems() {
        return productsList?.map((item) => <Item prod={item} key={item.code} />);
    }

    return (
        <Row xs={1} sm={2} lg={3} xl={4} xxl={5}>
            {renderItems()}
        </Row>
        
        // <>
        //     {productsList.map(product => <Item key={product.id} prod={product}/>)}
        // </>  
        
    );
} 

export default ItemList;