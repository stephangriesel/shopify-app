import { EmptyState, Layout, Page } from '@shopify/polaris';

// const { render } = require("react-dom")

function Index() {
    return (
        <Page>
            <Layout>
                <EmptyState
                    heading="Manage your products"
                    action={{ content: 'Select Products' }}
                // secondaryAction={{ content: 'Learn more', url: 'https://help.shopify.com' }}
                // image="https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg"
                >
                    <p>Select Products</p>
                </EmptyState>
            </Layout>
        </Page>
    )
}

export default Index;