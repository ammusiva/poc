import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import TableView from './components/TableView';
import styled from 'styled-components';
import useFetchSidebarItems from './hooks/useFetchSidebarItems';

const AppContainer = styled.div`
  font-family: Arial, sans-serif;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainLayout = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Content = styled.div`
  flex: 1;
  padding: 1rem;
  overflow-x: hidden;
  overflow-y: auto;

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;
function App() {
  const [selectedItem, setSelectedItem] = useState({table: null, group: null});
  const { items, loading, error } = useFetchSidebarItems();
  const handleSelect = (tbl, group) => {
    setSelectedItem({table: tbl, group});
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading while listing tables</p>;
  
  return (
    <AppContainer>
      <Header />
      <MainLayout>
        <Sidebar onSelect={handleSelect} data={items} selectedItem={selectedItem} />
        <Content>
          {selectedItem.table !== null && (
            <>
                <TableView obj={selectedItem} />
            </>
          )}
        </Content>
      </MainLayout>
    </AppContainer>
  );
}

export default App;
