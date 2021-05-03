import React from "react";
// reactstrap components
import { InputGroup, InputGroupText, InputGroupAddon, Input } from "reactstrap";

const SearchBar = ({ onChange }) => {
  return (
    <form>
      {/* Search  */}
      <InputGroup className="no-border">
        <Input
          placeholder="Pesquisar..."
          onChange={(event) => onChange(event.target.value)}
        />
        <InputGroupAddon addonType="append">
          <InputGroupText>
            <i className="nc-icon nc-zoom-split" />
          </InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </form>
  );
};

export default SearchBar;
