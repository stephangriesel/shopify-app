import React, { useState } from 'react';
import { EmptyState, Layout, Page } from '@shopify/polaris';
import { ResourcePicker } from '@shopify/app-bridge-react';
import store from 'store-js';
import ProductList from '../components/ProductList';

// const { render } = require("react-dom")

function Index() {

    const [modal, setModal] = useState({ open: false })
    const emptyState = !store.get('ids');

    function handleSection(resources) {
        const idsFromResources = resources.selection.map((product) => product.id);
        setModal({
            open: false
        });
        store.set('ids', idsFromResources);
        console.log('product ids test', store.get('ids'));
    }


    return (
        <Page>
            <ResourcePicker
                resourceType="Product"
                showVariants={false}
                open={modal.open}
                onCancel={() => setModal({ open: false })}
                onSelection={(resources) => handleSection(resources)}
            />
            <Layout>
                {emptyState ?
                    <EmptyState
                        heading="Manage your products"
                        action={{
                            content: 'Select Products',
                            onAction: () => setModal({ open: true })
                        }}
                    // secondaryAction={{ content: 'Learn more', url: 'https://help.shopify.com' }}
                    // image="https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg"
                    >
                        <p>Select Products</p>
                    </EmptyState>
                    :
                    <ProductList />
                }
            </Layout>
        </Page>
    )
}

export default Index;