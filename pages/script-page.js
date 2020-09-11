import gql from "graphql-tag";
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Button, Card, Layout, Page, ResourceList, Stack } from "@shopify/polaris";

const CREATE_SCRIPT_TAG = gql`
mutation scriptTagCreate($input: ScriptTagInput!) {
    scriptTagCreate(input: $input) {
      scriptTag {
        id
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const QUERY_SCRIPTTAGS = gql`
query {
  scriptTags(first:5) {
    edges {
      node {
        id
        src
        displayScope
      }
    }
  }
}
`

const DELETE_SCRIPT_TAG = gql`
mutation scriptTagDelete($id:ID!){
  scriptTagDelete(id:$id){
    deletedScriptTagId 
    userErrors {
      field
      message
    }
  }
}
`

function ScriptPage() {

  const [createScripts] = useMutation(CREATE_SCRIPT_TAG);
  const [deleteScripts] = useMutation(DELETE_SCRIPT_TAG);
  const { loading, error, data } = useQuery(QUERY_SCRIPTTAGS);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  console.log('script data', data);

  return (
    <Page>
      <Layout>
        <Layout.Section>
          <Card title="Script Tags" sectioned>
            <p>Create/Delete Script Tag</p>
          </Card>
        </Layout.Section>
      </Layout>
      <Layout.Section secondary>
        <Card title="Delete" sectioned>
          <Button
            primary
            size="slim"
            type="submit" onClick={() => {
              createScripts({
                variables: {
                  input: {
                    src: "https://cc5983061f22.ngrok.io/test-script.js",
                    displayScope: "ALL"
                  }
                },
                refetchQueries: [{ query: QUERY_SCRIPTTAGS }]
              })
            }}
          >New Tag</Button>
        </Card>
      </Layout.Section>
      <Layout.Section>
        <Card>
          <ResourceList
            showHeader
            resourceName={{ singular: 'Script', plural: 'Scripts' }}
            items={data.scriptTags.edges}
            renderItem={item => {
              return (
                <ResourceList.Item
                  id={item.id}
                >
                  <Stack>
                    <Stack.Item>
                      <p>
                        {item.node.id}
                      </p>
                    </Stack.Item>
                    <Stack.Item>
                      <Button type='submit' onClick={() => {
                        deleteScripts({
                          variables: {
                            id: item.node.id
                          },
                          refetchQueries: [{ query: QUERY_SCRIPTTAGS }]
                        })
                      }}>
                        X
                      </Button>
                    </Stack.Item>
                  </Stack>
                </ResourceList.Item>
              )
            }}
          />
        </Card>
      </Layout.Section>
    </Page>
    // <div>
    //   <h1>script tag test</h1>
    //   <button
    //     type="submit" onClick={() => {
    //       createScripts({
    //         variables: {
    //           input: {
    //             src: "https://6b2dfb346d5f.ngrok.io/test-script.js",
    //             displayScope: "ALL"
    //           }
    //         },
    //         refetchQueries: [{ query: QUERY_SCRIPTTAGS }]
    //       })
    //     }}
    //   >Create Script Tag</button>
    //   {data.scriptTags.edges.map(item => {
    //     return (
    //       <div key={item.node.id}>
    //         <p>{item.node.id}</p>
    //         <button type="submit" onClick={() => {
    //           deleteScripts({
    //             variables: {
    //               id: item.node.id
    //             },
    //             refetchQueries: [{ query: QUERY_SCRIPTTAGS }]
    //           })
    //         }}>
    //           Delete Script Tag
    //         </button>
    //       </div>
    //     )
    //   })}
    // </div>
  )
}

export default ScriptPage;
