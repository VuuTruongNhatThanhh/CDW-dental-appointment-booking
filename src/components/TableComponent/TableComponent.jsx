import { Divider, Dropdown, Radio, Space, Table } from "antd";
import React, { useMemo, useRef, useState } from "react";
import Loading from "../LoadingComponent/Loading";
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Excel } from "antd-table-saveas-excel";

const TableComponent = (props) => {
 
    const {selectionType = 'checkbox', data: dataSource=[], isPending= false, columns=[], handleDeleteMany} = props
    const [rowSelectedKeys, setRowSelectedKey] = useState([])

    // Phải bỏ cột action (xóa, sửa) thì xuất file excel mới không bị lỗi
    const newColumnExport = useMemo(()=>{
      const arr = columns?.filter((col)=>col.dataIndex !== 'action')
      return arr
    },[columns])
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          setRowSelectedKey(selectedRowKeys)
          // hiển thị cái id khi select
          // console.log(`selectedRowKeys: ${selectedRowKeys}`, );
        },
        // getCheckboxProps: (record) => ({
        //   disabled: record.name === 'Disabled User',
        //   // Column configuration not to be checked
        //   name: record.name,
        // }),
      };

      const items = [
        {
          key: '1',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
              1st menu item
            </a>
          ),
        },
        {
          key: '2',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
              2nd menu item (disabled)
            </a>
          ),
          disabled: true,
        },
        {
          key: '3',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
              3rd menu item (disabled)
            </a>
          ),
          disabled: true,
        },
        {
          key: '4',
          danger: true,
          label: 'a danger item',
        },
      ];

      const handleDeleteAll=() =>{
        handleDeleteMany(rowSelectedKeys)
      }

      const exportExcel = () => {
        const excel = new Excel();
        excel
          .addSheet("test")
          .addColumns(newColumnExport)
          .addDataSource(dataSource, {
            str2Percent: true
          })
          .saveAs("Excel.xlsx");
      };

      
    return (
        
           

    
      <Loading isPending={isPending}>



<button style={{marginBottom:'10px', 
                      background:'rgb(68, 68, 68)',
                      height:'38px',
                      width:'fit-content',
                      border:'none',
                      borderRadius:'4px',
                      color:'rgb(255, 255, 255)',
                      fontWeight:'500',
                      cursor:'pointer'}} 
       onClick={exportExcel}>Xuất file excel</button>



        {/* Chọn hàng lớn hớn 0 thì hiện */}
        {/* {rowSelectedKeys.length >0 &&(
            <div style={{
              background: 'rgb(68, 68, 68)',
              color: '#fff',
              fontWeight:'bold',
              padding:'10px',
              cursor:'pointer'
            }}
            onClick={handleDeleteAll}
            > 
              Xóa */}
            {/* <Dropdown menu={{ items }}>
            <a onClick={(e) => e.preventDefault()}>
            <Space>
            Hover me
            <DownOutlined />
            </Space>
            </a>
            </Dropdown> */}
            {/* </div>
        )} */}

            
     
      <Table
    
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={dataSource}
        // rải props ra để nhận được cái function onRow
        {...props}
      />
      </Loading>
        
    )
}

export default TableComponent