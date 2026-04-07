import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Button } from "@base-ui/react";
import { Product } from "@/type/global.type";
import { useRouter } from "next/navigation";

export default function ProductCard({ product }: { product: Product }) {
  const router = useRouter();
  return (
    <motion.div whileHover={{ scale: 1.05 }}>
      <Card className="rounded-2xl shadow-md hover:shadow-xl transition">
        <CardContent className="p-4">
          <div className="relative w-full h-40">
            <Image
              src={product.thumbnail}
              alt={product.title}
              fill
              className="object-contain"
            />
          </div>

          <h2 className="text-lg font-semibold mt-3 line-clamp-2">
            {product.title}
          </h2>
          <p className="text-sm text-gray-600 line-clamp-2">
            {product.description}
          </p>
          <p className="text-sm text-gray-600 line-clamp-2">
            {product.category}
          </p>
          <p className="text-xl font-bold mt-2">₹{product.price}</p>
        </CardContent>
        <CardFooter className="p-4">
          <Button
            className="w-full cursor-pointer"
            onClick={() => router.push(`/${product.id}`)}
          >
            View Details
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
