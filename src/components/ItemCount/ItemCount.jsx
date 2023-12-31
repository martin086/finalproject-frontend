import {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons';

const ItemCount = ({stock, onAdd}) => {
    const [contador, setContador] = useState(1);
    // si stock 0 , no mostrar boton de agregar al carrito
    const agregarAlCarrito = () => {
        onAdd(contador);
    }

    const incrementar = () => contador < stock && setContador(contador + 1);
    const decrementar = () => contador > 1 && setContador(contador - 1);
    
    return (
    <>
    <button onClick={() => decrementar()} className='btn btn-dark mx-2'>-</button>
    {contador}
    <button onClick={() => incrementar()} className='btn btn-dark mx-2'>+</button>
    <button onClick={() => agregarAlCarrito()} className='btn btn-info'>
    <FontAwesomeIcon icon={faCartArrowDown} />
    <span> Agregar</span>
    </button>
    </>
  )
}

export default ItemCount;