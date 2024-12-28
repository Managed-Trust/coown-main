import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import PageContainer from '../../../../components/container/PageContainer';
import Banner from './Banner';
import AdminTabs from './AdminTabs';
import Dashboard from './Dashboard';
import Sidebar from './Sidebar';
import ic from "ic0";
const ledger = ic("speiw-5iaaa-aaaap-ahora-cai");

function Products() {
    const [drawer, setDrawer] = useState(false);
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await ledger.call('getAllProducts');
                console.log('products', response);
                setProducts(response);
            } catch (e) {
                console.log('Error Fetching products:', e);
            }
        };
        fetchProducts();
    }, []);

    const toggleDrawer = (product) => {
        setSelectedProduct(product);
        setDrawer((prev) => !prev);
    };

    return (
        <>
            <PageContainer title="Admin Dashboard" description="this is Admin Dashboard page">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Banner />
                    </Grid>
                    <Grid item xs={12}>
                        <AdminTabs />
                    </Grid>
                    <Grid item xs={12}>
                        <Dashboard openDrawer={toggleDrawer} products={products} />
                    </Grid>
                </Grid>
            </PageContainer>
            <Sidebar openDrawer={toggleDrawer} drawer={drawer} product={selectedProduct}/>
        </>
    );
}

export default Products;