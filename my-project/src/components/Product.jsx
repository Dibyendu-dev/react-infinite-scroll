import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Product = ({title,price,description}) => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
       
        <CardFooter>
          <p>{price}</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Product;
