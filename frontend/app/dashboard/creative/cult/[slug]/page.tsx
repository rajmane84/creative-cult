'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  Users,
  Crown,
  User,
  UserPlus,
  LogOut,
  Trash2,
  Calendar,
  Sparkles,
  Shield,
  Loader2,
} from 'lucide-react';
import { useCultDetail, useCultActions } from '@/hooks/creative/cult';
import { cn } from '@/lib/cn';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { InviteMemberModal } from '@/components/creative/cult';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export default function CultDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const router = useRouter();

  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isDisbandDialogOpen, setIsDisbandDialogOpen] = useState(false);
  const [isLeaveDialogOpen, setIsLeaveDialogOpen] = useState(false);
  const [memberToRemove, setMemberToRemove] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [memberToTransferOwnership, setMemberToTransferOwnership] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const { cult, isLoading, isError } = useCultDetail(slug);
  const {
    leaveCult,
    removeMember,
    updateMemberRole,
    disbandCult,
    isLeaving,
    isRemoving,
    isUpdatingRole,
    isDisbanding,
  } = useCultActions(cult?.id, slug);

  if (isLoading) {
    return (
      <div className="w-full bg-background min-h-[70vh] p-6 sm:p-10 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-muted-foreground">
          <Loader2 className="size-8 animate-spin text-primary selection:text-background selection:bg-primary" />
          <span className="font-mono text-xs uppercase tracking-widest">
            Loading cult details...
          </span>
        </div>
      </div>
    );
  }

  if (isError || !cult) {
    return (
      <div className="w-full bg-background min-h-[70vh] p-6 sm:p-10 flex flex-col items-center justify-center space-y-4">
        <div className="flex size-14 items-center justify-center border border-border bg-card text-muted-foreground">
          <Sparkles className="size-6 text-primary selection:text-background selection:bg-primary" />
        </div>
        <h2 className="font-editorial text-3xl font-bold text-foreground">
          Cult not found
        </h2>
        <p className="font-body text-sm text-muted-foreground">
          The requested collective does not exist or may have been disbanded.
        </p>
        <Button variant="outline" className="cursor-pointer gap-2">
          <Link
            href="/dashboard/creative/cult"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="size-4" />
            <span>Back to Cults</span>
          </Link>
        </Button>
      </div>
    );
  }

  const isOwner =
    cult.userRole === 'OWNER' || (cult.userRole as string) === 'LEADER';
  const isAdmin = cult.userRole === 'ADMIN';
  const canManageInvites = isOwner || isAdmin;
  const canDisband = isOwner;

  const handleDisband = () => {
    setIsDisbandDialogOpen(true);
  };

  const handleLeave = () => {
    if (!cult.userMembershipId) return;
    setIsLeaveDialogOpen(true);
  };

  return (
    <div className="w-full bg-background">
      <div className="w-full max-w-7xl mx-auto space-y-8 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="border border-border bg-card p-6 sm:p-8 md:p-10 space-y-6 relative overflow-hidden"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4 sm:gap-6">
              <Avatar className="size-16 sm:size-20 rounded-none border border-border bg-background shrink-0">
                {cult.avatarUrl && (
                  <AvatarImage src={cult.avatarUrl} alt={cult.name} />
                )}
                <AvatarFallback className="rounded-none font-editorial text-2xl font-bold text-primary selection:text-background selection:bg-primary">
                  {cult.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
                    {cult.name}
                  </h1>

                  {cult.userRole && (
                    <Badge
                      className={cn(
                        'px-3 py-1 font-mono text-[10px] uppercase tracking-wider rounded-full border',
                        isOwner
                          ? 'border-primary/40 bg-primary/10 text-primary selection:text-background selection:bg-primary font-semibold'
                          : isAdmin
                            ? 'border-cyan-500/40 bg-cyan-500/10 text-cyan-600 font-semibold'
                            : 'border-border bg-muted text-muted-foreground'
                      )}
                    >
                      {isOwner ? (
                        <Crown className="size-3 mr-1" />
                      ) : isAdmin ? (
                        <Shield className="size-3 mr-1" />
                      ) : (
                        <User className="size-3 mr-1" />
                      )}
                      {isOwner ? 'Owner' : isAdmin ? 'Admin' : 'Member'}
                    </Badge>
                  )}
                </div>

                {cult.tagline && (
                  <p className="font-body text-base sm:text-lg text-muted-foreground max-w-2xl">
                    {cult.tagline}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-4 pt-1 font-mono text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Users className="size-3.5 text-primary selection:text-background selection:bg-primary" />
                    <span>
                      {cult.memberCount}{' '}
                      {cult.memberCount === 1 ? 'member' : 'members'}
                    </span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="size-3.5 text-primary selection:text-background selection:bg-primary" />
                    <span>
                      Established{' '}
                      {new Date(cult.createdAt).toLocaleDateString(undefined, {
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </span>
                  <span>•</span>
                  <span className="uppercase tracking-wider">#{cult.slug}</span>
                </div>
              </div>
            </div>

            {/* Owner / Admin / Member Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 shrink-0 self-start md:self-center pt-2 md:pt-0 border-t md:border-t-0 border-border/40 w-full md:w-auto">
              {canManageInvites && (
                <Button
                  onClick={() => setIsInviteModalOpen(true)}
                  className="cursor-pointer gap-2 flex-1 md:flex-none"
                >
                  <UserPlus className="size-4" />
                  <span>Invite Creative</span>
                </Button>
              )}

              {canDisband && (
                <Button
                  onClick={handleDisband}
                  disabled={isDisbanding}
                  variant="destructive"
                >
                  {isDisbanding ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <Trash2 className="size-4" />
                  )}
                  <span>Disband Cult</span>
                </Button>
              )}

              {cult.userMembershipId && (
                <Button
                  onClick={handleLeave}
                  disabled={isLeaving}
                  variant="outline"
                  className="cursor-pointer gap-2 text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/30 flex-1 md:flex-none"
                >
                  {isLeaving ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <LogOut className="size-4" />
                  )}
                  <span>Leave Cult</span>
                </Button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Bio / Mission Section */}
        {cult.bio && (
          <div className="border border-border bg-card p-6 sm:p-8 space-y-3">
            <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <Sparkles className="size-3.5 text-primary selection:text-background selection:bg-primary" />
              <span>Collective Manifesto</span>
            </h3>
            <p className="font-body text-sm sm:text-base text-foreground leading-relaxed whitespace-pre-line">
              {cult.bio}
            </p>
          </div>
        )}

        {/* Members Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-border/40 pb-3">
            <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <Users className="size-3.5 text-primary selection:text-background selection:bg-primary" />
              <span>Active Roster ({cult.memberships?.length || 0})</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            {cult.memberships?.map((member) => {
              const memberUser = member.creativeProfile.user;
              const isTargetOwner = member.role === 'OWNER';
              const isTargetAdmin = member.role === 'ADMIN';
              const isSelf = member.id === cult.userMembershipId;

              return (
                <div
                  key={member.id}
                  className="flex items-center justify-between border border-border bg-card p-5 transition-colors hover:border-foreground"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <Avatar className="size-12 rounded-none border border-border bg-background shrink-0">
                      {memberUser.image && (
                        <AvatarImage
                          src={memberUser.image}
                          alt={memberUser.name}
                        />
                      )}
                      <AvatarFallback className="rounded-none font-editorial font-bold text-primary selection:text-background selection:bg-primary">
                        {memberUser.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-editorial text-lg font-bold text-foreground truncate">
                          {memberUser.name}
                        </h4>
                        <Badge
                          variant="outline"
                          className={cn(
                            'px-2 py-0 font-mono text-[9px] uppercase shrink-0',
                            isTargetOwner
                              ? 'border-primary/40 text-primary selection:text-background selection:bg-primary font-semibold'
                              : isTargetAdmin
                                ? 'border-cyan-500/40 text-cyan-600 font-semibold'
                                : 'border-border text-muted-foreground'
                          )}
                        >
                          {isTargetOwner
                            ? 'Owner'
                            : isTargetAdmin
                              ? 'Admin'
                              : 'Member'}
                        </Badge>
                      </div>

                      {member.creativeProfile.headline && (
                        <p className="font-body text-xs text-muted-foreground truncate">
                          {member.creativeProfile.headline}
                        </p>
                      )}

                      <p className="font-mono text-[10px] text-muted-foreground">
                        Joined{' '}
                        {new Date(member.joinedAt).toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Roster Controls */}
                  {!isSelf && (
                    <div className="flex items-center gap-2 shrink-0">
                      {/* Owner Controls */}
                      {isOwner && !isTargetOwner && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            disabled={isUpdatingRole}
                            onClick={() =>
                              setMemberToTransferOwnership({
                                id: member.id,
                                name: memberUser.name,
                              })
                            }
                            className="font-mono text-[10px] uppercase h-8 px-2 cursor-pointer text-primary border-primary/30 hover:bg-primary/10 selection:text-background selection:bg-primary"
                            title="Transfer Ownership"
                          >
                            <Crown className="size-3 mr-1" />
                            Make Owner
                          </Button>

                          {isTargetAdmin ? (
                            <Button
                              size="sm"
                              variant="ghost"
                              disabled={isUpdatingRole}
                              onClick={() =>
                                updateMemberRole({
                                  membershipId: member.id,
                                  role: 'MEMBER',
                                })
                              }
                              className="font-mono text-[10px] uppercase h-8 px-2 cursor-pointer"
                              title="Demote to Member"
                            >
                              Make Member
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              variant="ghost"
                              disabled={isUpdatingRole}
                              onClick={() =>
                                updateMemberRole({
                                  membershipId: member.id,
                                  role: 'ADMIN',
                                })
                              }
                              className="font-mono text-[10px] uppercase h-8 px-2 cursor-pointer text-cyan-600 hover:bg-cyan-500/10"
                              title="Promote to Admin"
                            >
                              <Shield className="size-3 mr-1" />
                              Make Admin
                            </Button>
                          )}

                          <Button
                            size="sm"
                            variant="ghost"
                            disabled={isRemoving}
                            onClick={() =>
                              setMemberToRemove({
                                id: member.id,
                                name: memberUser.name,
                              })
                            }
                            className="h-8 px-2 cursor-pointer text-destructive hover:text-destructive hover:bg-destructive/10"
                            title="Remove Member"
                          >
                            <Trash2 className="size-3.5" />
                          </Button>
                        </>
                      )}

                      {/* Admin Controls over Members */}
                      {isAdmin && !isTargetOwner && !isTargetAdmin && (
                        <Button
                          size="sm"
                          variant="ghost"
                          disabled={isRemoving}
                          onClick={() =>
                            setMemberToRemove({
                              id: member.id,
                              name: memberUser.name,
                            })
                          }
                          className="h-8 px-2 cursor-pointer text-destructive hover:text-destructive hover:bg-destructive/10"
                          title="Remove Member"
                        >
                          <Trash2 className="size-3.5" />
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Invite Member Modal */}
      {canManageInvites && (
        <InviteMemberModal
          cultId={cult.id}
          cultSlug={cult.slug}
          cultName={cult.name}
          open={isInviteModalOpen}
          onOpenChange={setIsInviteModalOpen}
        />
      )}

      {/* Disband Cult Alert Dialog */}
      <AlertDialog
        open={isDisbandDialogOpen}
        onOpenChange={setIsDisbandDialogOpen}
      >
        <AlertDialogContent className="bg-card border-border">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-editorial text-xl font-bold text-foreground">
              Disband Cult
            </AlertDialogTitle>
            <AlertDialogDescription className="font-body text-sm text-muted-foreground">
              Are you sure you want to disband &quot;{cult.name}&quot;? This
              action cannot be undone and all cult membership data will be
              removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              disabled={isDisbanding}
              className="cursor-pointer"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              disabled={isDisbanding}
              onClick={() => {
                disbandCult(undefined, {
                  onSuccess: () => {
                    setIsDisbandDialogOpen(false);
                    router.push('/dashboard/creative/cult');
                  },
                });
              }}
              className="cursor-pointer gap-2"
            >
              {isDisbanding && <Loader2 className="size-4 animate-spin" />}
              <span>Disband Cult</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Leave Cult Alert Dialog */}
      <AlertDialog open={isLeaveDialogOpen} onOpenChange={setIsLeaveDialogOpen}>
        <AlertDialogContent className="bg-card border-border">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-editorial text-xl font-bold text-foreground">
              Leave Cult
            </AlertDialogTitle>
            <AlertDialogDescription className="font-body text-sm text-muted-foreground">
              Are you sure you want to leave &quot;{cult.name}&quot;? You will
              lose access to team briefs and cult activities.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLeaving} className="cursor-pointer">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              disabled={isLeaving}
              onClick={() => {
                if (!cult.userMembershipId) return;
                leaveCult(cult.userMembershipId, {
                  onSuccess: () => {
                    setIsLeaveDialogOpen(false);
                    router.push('/dashboard/creative/cult');
                  },
                });
              }}
              className="cursor-pointer gap-2"
            >
              {isLeaving && <Loader2 className="size-4 animate-spin" />}
              <span>Leave Cult</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Remove Member Alert Dialog */}
      <AlertDialog
        open={!!memberToRemove}
        onOpenChange={(open) => {
          if (!open) setMemberToRemove(null);
        }}
      >
        <AlertDialogContent className="bg-card border-border">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-editorial text-xl font-bold text-foreground">
              Remove Member
            </AlertDialogTitle>
            <AlertDialogDescription className="font-body text-sm text-muted-foreground">
              Are you sure you want to remove {memberToRemove?.name} from &quot;
              {cult.name}&quot;?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isRemoving} className="cursor-pointer">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              disabled={isRemoving}
              onClick={() => {
                if (!memberToRemove) return;
                removeMember(memberToRemove.id, {
                  onSuccess: () => {
                    setMemberToRemove(null);
                  },
                });
              }}
              className="cursor-pointer gap-2"
            >
              {isRemoving && <Loader2 className="size-4 animate-spin" />}
              <span>Remove Member</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Transfer Ownership Alert Dialog */}
      <AlertDialog
        open={!!memberToTransferOwnership}
        onOpenChange={(open) => {
          if (!open) setMemberToTransferOwnership(null);
        }}
      >
        <AlertDialogContent className="bg-card border-border">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-editorial text-xl font-bold text-foreground">
              Transfer Cult Ownership
            </AlertDialogTitle>
            <AlertDialogDescription className="font-body text-sm text-muted-foreground">
              Are you sure you want to transfer ownership of &quot;{cult.name}
              &quot; to {memberToTransferOwnership?.name}? You will become an
              Admin of the cult.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              disabled={isUpdatingRole}
              className="cursor-pointer"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={isUpdatingRole}
              onClick={() => {
                if (!memberToTransferOwnership) return;
                updateMemberRole(
                  {
                    membershipId: memberToTransferOwnership.id,
                    role: 'OWNER',
                  },
                  {
                    onSuccess: () => {
                      setMemberToTransferOwnership(null);
                    },
                  }
                );
              }}
              className="cursor-pointer gap-2"
            >
              {isUpdatingRole && <Loader2 className="size-4 animate-spin" />}
              <span>Transfer Ownership</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
