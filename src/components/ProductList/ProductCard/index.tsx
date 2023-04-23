import { StyledProductCard } from "./style";
import { StyledButton } from "../../../styles/button";
import { StyledParagraph, StyledTitle } from "../../../styles/typography";

const ProductCard = (
  key: number,
  name: string,
  category: string,
  price: number,
  img: string
) => {
  return (
    <StyledProductCard key={key}>
      <div className="imageBox">
        <img src={img} alt="Hamburguer" />
      </div>
      <div className="content">
        <StyledTitle tag="h3" $fontSize="three">
          {name}
        </StyledTitle>
        <StyledParagraph className="category">{category}</StyledParagraph>
        <StyledParagraph className="price">R$ {price},00</StyledParagraph>
        <StyledButton $buttonSize="medium" $buttonStyle="green">
          Adicionar
        </StyledButton>
      </div>
    </StyledProductCard>
  );
};

export default ProductCard;
