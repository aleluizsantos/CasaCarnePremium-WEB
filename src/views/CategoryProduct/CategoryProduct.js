import React from "react";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Button,
  Table,
} from "reactstrap";

const CategoryProduct = () => {
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Minhas Categorias </CardTitle>
              </CardHeader>

              <CardBody>BODY</CardBody>

              <CardFooter>footer</CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default CategoryProduct;
