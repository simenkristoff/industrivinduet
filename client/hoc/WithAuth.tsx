import { useAuth } from '@/hooks';

/**
 * Wrapper for paths that requires auth
 */
const WithAuth = (props: any) => useAuth() && props.children;

export default WithAuth;
