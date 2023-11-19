import React, { useState } from "react";
import { Table } from 'react-bootstrap'
import ProductCard from "./ProductCard";
import Grid from '@mui/material/Grid';



const style = {
  h1: {
    marginTop: "3em"
  },
  h2: {
    margin: "4em 0em 2em"
  },
  h3: {
    marginTop: "2em",
    padding: "2em 0em"
  },
  last: {
    marginBottom: "300px"
  }
};

function ProductComparison  ({ products })  {
  const [selectedItems, setSelectedItems] = useState([]);

  const addToCompare = (item) => {
    setSelectedItems((selectedItems) => [...selectedItems, item]);
  };

  const removeFromCompare = (item) => {
    const filteredItems = selectedItems.filter(
      (product) => product.id !== item.id
    );
    setSelectedItems((selectedItems) => filteredItems);
  };

  return (
    <div>
      <h1>Compare Items</h1>
      {selectedItems.length > 0 && (
        <Table definition>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell></Table.HeaderCell>
              {selectedItems.map((el) => (
                <Table.HeaderCell key={el.id}>{el.name}</Table.HeaderCell>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>
                <h4 color="orange" ribbon>
                  Price
                </h4>
              </Table.Cell>
              {selectedItems.map((el) => (
                <Table.Cell key={el.id}>{el.price}</Table.Cell>
              ))}
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <h4 color="teal" ribbon>
                  Description
                </h4>
              </Table.Cell>
              {selectedItems.map((el) => (
                <Table.Cell key={el.id}>{el.brand}</Table.Cell>
              ))}
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <h4 color="pink" ribbon>
                  Condition
                </h4>
              </Table.Cell>
              {selectedItems.map((el) => (
                <Table.Cell key={el.id}>{el.origin}</Table.Cell>
              ))}
            </Table.Row>
          </Table.Body>
        </Table>
      )}
      <Grid columns={selectedItems.length} stackable padded divided>

        
          {products.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                selected={selectedItems}
                addToCompare={addToCompare}
                removeFromCompare={removeFromCompare}
              />
          ))}



      </Grid>
    </div>
  );
};

export default ProductComparison;
