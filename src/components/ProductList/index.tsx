import { useContext } from "react";
import { StyledProductList } from "./style";
import { ShopContext } from "../../providers/ShopContext";
import { StyledProductCard } from "./ProductCard/style";
import { StyledParagraph, StyledTitle } from "../../styles/typography";
import { StyledButton } from "../../styles/button";
import { toast } from "react-toastify";

interface IProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  img: string;
}

const ProductList = () => {
  const { productList, setModalOpen, cartProductList, setCartProductList } =
    useContext(ShopContext);

  const addProductToCart = (product: IProduct) => {
    if (!cartProductList.some((cartProduct) => cartProduct.id === product.id)) {
      const newCartList = [...cartProductList, product];
      setCartProductList(newCartList);
      setModalOpen(true);
    } else {
      toast.error("Produto já está no carrinho.");
      return;
    }
  };

  return (
    <>
      <StyledProductList>
        {productList.map((currentProduct) => (
          <StyledProductCard key={currentProduct.id}>
            <div className="imageBox">
              <img src={currentProduct.img} alt="Hamburguer" />
            </div>
            <div className="content">
              <StyledTitle tag="h3" $fontSize="three">
                {currentProduct.name}
              </StyledTitle>
              <StyledParagraph className="category">
                {currentProduct.category}
              </StyledParagraph>
              <StyledParagraph className="price">
                {currentProduct.price.toLocaleString("pt-br", {
                  style: "currency",
                  currency: "BRL",
                })}
              </StyledParagraph>
              <StyledButton
                $buttonSize="medium"
                $buttonStyle="green"
                onClick={() => addProductToCart(currentProduct)}
              >
                Adicionar
              </StyledButton>
            </div>
          </StyledProductCard>
        ))}
      </StyledProductList>
    </>
  );
};

export default ProductList;
