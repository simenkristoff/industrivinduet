import { useAuth } from '@/hooks';

const WithAuth = (props: any) => useAuth() && props.children;

export default WithAuth;
