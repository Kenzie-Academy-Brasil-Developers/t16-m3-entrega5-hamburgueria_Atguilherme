import { MdSearch } from "react-icons/md";
import { StyledSearchForm } from "./style";
import { StyledButton } from "../../../styles/button";

const SearchForm = () => {
  return (
    <StyledSearchForm>
      <input type="text" placeholder="Digitar pesquisa" id="inputSearch" />
      <StyledButton type="submit" $buttonSize="medium" $buttonStyle="green">
        <MdSearch />
      </StyledButton>
    </StyledSearchForm>
  );
};

export default SearchForm;
