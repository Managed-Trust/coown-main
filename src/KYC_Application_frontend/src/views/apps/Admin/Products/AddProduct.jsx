import React, { useState } from 'react';
import ChildCard from '../../../../components/shared/ChildCard';
import {
    Box,
    Grid,
    TextField,
    Typography,
    Button,
} from '@mui/material';
import CustomFormLabel from '../../../../components/forms/theme-elements/CustomFormLabel';
import ic from "ic0";
import swal from 'sweetalert'; // Ensure this dependency is installed

const ledger = ic("speiw-5iaaa-aaaap-ahora-cai"); // Ledger canister

const initialState = {
    id: "", // Text (string)
    name: "", // Text (string)
    price: 0, // Nat (number)
    productOwner: "", // Text (string)
    salesChannel: "", // Text (string)
};

const AddProduct = ({onFormShow,onFormSubmit}) => {
    const [formData, setFormData] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = "Product name is required.";
        if (!formData.productOwner) newErrors.productOwner = "Product owner is required.";
        if (!formData.salesChannel) newErrors.salesChannel = "Sales channel is required.";
        if (formData.price <= 0) newErrors.price = "Price must be greater than zero.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        const productId = `Product-${Math.floor(100000 + Math.random() * 900000).toString()}`;

        try {
            const response = await ledger.call(
                'addOrUpdateProduct',
                productId,
                formData.name,
                formData.price,
                formData.productOwner,
                formData.salesChannel
            );

            if (response) {
                console.log('Product Added:', response);
                swal("Success", "Product added successfully", "success");
                setFormData(initialState); // Reset form
                onFormShow(false);
                onFormSubmit();
            } else {
                swal("Error", "Product not added", "error");
            }
        } catch (error) {
            console.error('Error:', error);
            swal("Error", "An unexpected error occurred", "error");
        }

        setLoading(false);
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: id === "price" ? parseFloat(value) || 0 : value, // Handle numeric conversion for price
        }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Box>
                        <Grid container spacing={2} p={3}>
                            <Grid item xs={12} sm={12} md={4}>
                                <Typography sx={{ paddingTop: '30px' }} variant="h6" gutterBottom>
                                    Product Details
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={8}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <CustomFormLabel htmlFor="name">Product Name</CustomFormLabel>
                                        <TextField
                                            id="name"
                                            fullWidth
                                            placeholder="Enter product name"
                                            onChange={handleInputChange}
                                            value={formData.name}
                                            error={!!errors.name}
                                            helperText={errors.name}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <CustomFormLabel htmlFor="productOwner">Product Owner</CustomFormLabel>
                                        <TextField
                                            id="productOwner"
                                            fullWidth
                                            placeholder="Enter product owner"
                                            onChange={handleInputChange}
                                            value={formData.productOwner}
                                            error={!!errors.productOwner}
                                            helperText={errors.productOwner}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <CustomFormLabel htmlFor="salesChannel">Sales Channel</CustomFormLabel>
                                        <TextField
                                            id="salesChannel"
                                            fullWidth
                                            placeholder="Enter sales channel"
                                            onChange={handleInputChange}
                                            value={formData.salesChannel}
                                            error={!!errors.salesChannel}
                                            helperText={errors.salesChannel}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <CustomFormLabel htmlFor="price">Price</CustomFormLabel>
                                        <TextField
                                            id="price"
                                            type="number"
                                            fullWidth
                                            placeholder="Enter price"
                                            onChange={handleInputChange}
                                            value={formData.price}
                                            error={!!errors.price}
                                            helperText={errors.price}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            disabled={loading}
                                        >
                                            {loading ? "Submitting..." : "Add Product"}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                </Box>
            </Grid>
        </form>
    );
};

export default AddProduct;
