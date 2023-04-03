import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

export const TempChart = () => {
    const data = [
        { name: 'Jan', uv: 400, pv: 2400 },
        { name: 'Feb', uv: 300, pv: 1398 },
        { name: 'Mar', uv: 200, pv: 9800 },
        { name: 'Apr', uv: 278, pv: 3908 },
        { name: 'May', uv: 189, pv: 4800 },
        { name: 'Jun', uv: 239, pv: 3800 },
        { name: 'Jul', uv: 349, pv: 4300 },
      ];
  return (
    <ResponsiveContainer width="100%" height={300}>
    <AreaChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Area type="monotone" dataKey="pv" stroke="#8884d8" fill="#8884d8" />
      <Area type="monotone" dataKey="uv" stroke="#82ca9d" fill="#82ca9d" />
    </AreaChart>
  </ResponsiveContainer>
  );

};