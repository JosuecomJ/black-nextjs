import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { ReactNode } from "react";
import { Container } from "reactstrap";
import Header from "../../components/Header";
import ProductDetails from "../../components/ProductDetails";
import { fetchProduct, fetchProducts, ProductType } from "../../services/products";

export const getStaticProps: GetStaticProps = async (context) => {
    const id = context.params?.id

    if (typeof id === 'string') {
        try {
            const product = await fetchProduct(id)

            return {
                props: {
                    product
                }
            }
        } catch (error) {
            console.error(`Error fetching product with id ${id}: ${error}`);
        }
    }

    return {
        redirect: {
            destination: '/products',
            permanent: false
        }
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const products = await fetchProducts()

    const paths = products.map(product => {
        return {
            params: {
                id: product.id.toString()
            }
        }
    })

    return {
        paths,
        fallback: false
    }
}

const Product: NextPage = (props: {
    children?: ReactNode
    product?: ProductType
}) => {
    if (!props.product) {
        console.log( fetchProducts())
        return <div>Produto não encontrado</div>;
    }

    return (
        <>
            <Head>
                <title>{props.product.name}</title>
                <meta name="description" content={props.product.description} />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />

            <Container className="mt-5">
                <ProductDetails product={props.product} />
            </Container>
        </>
    )
}

export default Product