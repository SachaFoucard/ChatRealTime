import React from 'react';
import { Select, Space } from 'antd';
import { ClockCircleTwoTone, CheckCircleTwoTone, StopTwoTone } from '@ant-design/icons';

const Mode = () => (
    <Space wrap>
        <Select
            defaultValue="Active"
            style={{
                width: 200,
                marginLeft:20
            }}
            variant={false}
            options={[
                {
                    value: 'Active',
                    label: (
                        <>
                            Active <CheckCircleTwoTone twoToneColor="#52c41a" />
                        </>
                    ),
                },
                {
                    value: 'Away',
                    label: (
                        <>
                            Away <ClockCircleTwoTone twoToneColor="#ffbf00" />
                        </>
                    ),
                },
                {
                    value: 'Do not disturb',
                    label: (
                        <>
                            Do not disturb <StopTwoTone twoToneColor="#f5222d" />
                        </>
                    ),
                },
            ]}
        />
    </Space>
);

export default Mode;
