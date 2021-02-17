import React from "react";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";
const ProductAdd = () => {
  return (
    <div className="content">
      <Row>
        <Col md="4">
          <Card className="card-user">
            <div className="image">
              <img alt="..." src={require("assets/img/background.jpg")} />
            </div>
            <CardBody>
              <div className="author">
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  <img
                    alt="..."
                    className="avatar border-gray"
                    src={require("assets/img/default-avatar.png")}
                  />
                  <h5 className="title">Chet Faker</h5>
                </a>
                <p className="description">@chetfaker</p>
              </div>
              <p className="description text-center">
                "I like the way you work it <br />
                No diggity <br />I wanna bag it up"
              </p>
            </CardBody>
            <CardFooter>
              <hr />
              <div className="button-container">
                <Row>
                  <Col className="ml-auto" lg="3" md="6" xs="6">
                    <h5>
                      12 <br />
                      <small>Files</small>
                    </h5>
                  </Col>
                  <Col className="ml-auto mr-auto" lg="4" md="6" xs="6">
                    <h5>
                      2GB <br />
                      <small>Used</small>
                    </h5>
                  </Col>
                  <Col className="mr-auto" lg="3">
                    <h5>
                      24,6$ <br />
                      <small>Spent</small>
                    </h5>
                  </Col>
                </Row>
              </div>
            </CardFooter>
          </Card>
        </Col>
        <Col md="8">
          <Card className="card-user">
            <CardHeader>
              <CardTitle tag="h5">Novo produto</CardTitle>
            </CardHeader>
            <CardBody>
              <Form>
                <Row>
                  <Col className="pr-1" md="6">
                    <FormGroup>
                      <label>Produto</label>
                      <Input placeholder="Produto" type="text" />
                    </FormGroup>
                  </Col>
                  <Col className="pl-1" md="6">
                    <FormGroup>
                      <label>Last Name</label>
                      <Input
                        defaultValue="Faker"
                        placeholder="Last Name"
                        type="text"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="12">
                    <FormGroup>
                      <label>Address</label>
                      <Input
                        defaultValue="Melbourne, Australia"
                        placeholder="Home Address"
                        type="text"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col className="pr-1" md="4">
                    <FormGroup>
                      <label>City</label>
                      <Input
                        defaultValue="Melbourne"
                        placeholder="City"
                        type="text"
                      />
                    </FormGroup>
                  </Col>
                  <Col className="px-1" md="4">
                    <FormGroup>
                      <label>Country</label>
                      <Input
                        defaultValue="Australia"
                        placeholder="Country"
                        type="text"
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pl-1" md="4">
                    <FormGroup>
                      <label>Postal Code</label>
                      <Input placeholder="ZIP Code" type="number" />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="12">
                    <FormGroup>
                      <label>Descrição</label>
                      <Input type="textarea" />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <div className="update ml-auto mr-auto">
                    <Button className="btn-round" color="primary" type="submit">
                      Update Profile
                    </Button>
                  </div>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default ProductAdd;
