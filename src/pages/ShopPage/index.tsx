import { StyledShopPage } from "./style";
import CartModal from "../../components/CartModal";
import Header from "../../components/Header";
import ProductList from "../../components/ProductList";
import { useContext } from "react";
import { ShopContext } from "../../providers/ShopContext";
import { StyledContainer } from "../../styles/grid";

const ShopPage = () => {
  const { modalOpen } = useContext(ShopContext);

  return (
    <StyledShopPage>
      {modalOpen ? <CartModal /> : null}
      <Header />
      <main>
        <StyledContainer containerWidth={1300}>
          <ProductList />
        </StyledContainer>
      </main>
    </StyledShopPage>
  );
};

export default ShopPage;
