import { StyledCartProductList } from "./style";
import { StyledButton } from "../../../styles/button";
import { StyledParagraph } from "../../../styles/typography";
import { useContext } from "react";
import { ShopContext } from "../../../providers/ShopContext";
import { StyledCartProductCard } from "./CartProductCard/style";
import { StyledTitle } from "../../../styles/typography";
import { MdDelete } from "react-icons/md";

const CartProductList = () => {
  const { cartProductList, setCartProductList } = useContext(ShopContext);
  const currentCartProductList = cartProductList;

  const removeProductFromCart = (key: number) => {
    const newCartList = cartProductList.filter((product) => product.id !== key);
    setCartProductList(newCartList);
  };

  const removeAllProductsFromCart = () => {
    setCartProductList([]);
  };

  const cartTotal = cartProductList.reduce((previousValue, itemPrice) => {
    return previousValue + itemPrice.price;
  }, 0);

  return (
    <StyledCartProductList>
      <ul>
        {currentCartProductList.map((currentProduct) => (
          <StyledCartProductCard key={currentProduct.id}>
            <div className="imageBox">
              <img src={currentProduct.img} alt={currentProduct.name} />
            </div>
            <div className="contentBox">
              <StyledTitle tag="h3" $fontSize="three">
                {currentProduct.name}
              </StyledTitle>
              <button type="button" aria-label="Remover">
                <MdDelete
                  size={24}
                  onClick={() => removeProductFromCart(currentProduct.id)}
                />
              </button>
            </div>
          </StyledCartProductCard>
        ))}
      </ul>

      <div className="totalBox">
        <StyledParagraph>
          <strong>Total</strong>
        </StyledParagraph>
        <StyledParagraph className="total">
          {cartTotal.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
          })}
        </StyledParagraph>
      </div>
      <StyledButton
        $buttonSize="default"
        $buttonStyle="gray"
        onClick={() => removeAllProductsFromCart()}
      >
        Remover todos
      </StyledButton>
    </StyledCartProductList>
  );
};

export default CartProductList;
