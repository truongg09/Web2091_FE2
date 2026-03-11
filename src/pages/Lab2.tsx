import { Table } from "antd";
//Bài 1
function Bai1(){
    const columns = [
        {
          title: "ID",
          dataIndex: "id",
        },
        {
          title: "Name",
          dataIndex: "name",
        },
        {
          title: "Age",
          dataIndex: "age",
        },
        {
          title: "Major",
          dataIndex: "major",
        }
    ];
    const data = [
        {
          key: 1,
          id: 1,
          name: "Nam",
          age: 20,
          major: "IT"
        },
        {
          key: 2,
          id: 2,
          name: "Linh",
          age: 21,
          major: "Business"
        },
        {
          key: 3,
          id: 3,
          name: "Nga",
          age: 19,
          major: "Desgin"
        },
    ];
    
    return (
        <Table columns={columns} dataSource={data} pagination={false}/>
    );
    
}
function Bai2(){
    const columns = [
        {
          title: "ID",
          dataIndex: "id",
        },
        {
          title: "Product Name",
          dataIndex: "productName",
        },
        {
          title: "Price",
          dataIndex: "price",
        },
        {
          title: "Category",
          dataIndex: "category",
        }
    ];
    const data = [
        {
          key: 1,
          id: 1,
          productName: "iPhone 17",
          price: 20000000,
          category: "Điện thoại"
        },
        {
          key: 2,
          id: 2,
          productName: "Laptop Dell XPS",
          price: 25000000,
          category: "Laptop"
        },
        {
          key: 3,
          id: 3,
          productName: "Airport 4",
          price: 4000000,
          category: "Phụ kiện"
        },
        {
          key: 4,
          id: 4,
          productName: "iPhone 17 Pro Max",
          price: 35000000,
          category: "Điện thoại"
        },
        {
          key: 5,
          id: 5,
          productName: "Laptop Asus TUF Gaming",
          price: 28000000,
          category: "Laptop"
        },
    ];
    
    return (
        <Table columns={columns} dataSource={data} pagination={{pageSize:3}}/>
    );
    
}

function Lab2() {
    return (
      <div className="space-y-10">
  
        <div>
          <h1 className="text-left font-bold">Bài 1</h1>
          <Bai1/>
        </div>

        <div>
          <h1 className="text-left font-bold">Bài 2</h1>
          <Bai2/>
        </div>
  
      </div>
    );
  }
  
  export default Lab2;
  